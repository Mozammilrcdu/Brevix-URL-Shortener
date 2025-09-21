import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card } from "./ui/card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Error from "./error";
import * as yup from "yup";
import useFetch from "@/hooks/use-fetch";
import { createUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";
import { UrlState } from "@/context";
import { QRCode } from "react-qrcode-logo";
import { toast } from "react-hot-toast";

export function CreateLink() {
  const { user } = UrlState();
  const navigate = useNavigate();
  const ref = useRef();

  const [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink || "",
    customUrl: "",
  });

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup.string().url("Must be a valid URL").required("Long URL is required"),
    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const { loading, error, data, fn: fnCreateUrl } = useFetch(createUrl, {
    ...formValues,
    user_id: user.id,
  });

  useEffect(() => {
    if (!error && data) {
      toast.success("Link created successfully!");
      navigate(`/link/${data[0].id}`);
    } else if (error) {
      toast.error("Failed to create link");
    }
  }, [error, data]);

  const createNewLink = async () => {
    setErrors({});
    try {
      await schema.validate(formValues, { abortEarly: false });

      const canvas = ref.current?.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      await fnCreateUrl(blob);
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <Dialog
      defaultOpen={!!longLink}
      onOpenChange={(open) => {
        if (!open) setSearchParams({});
      }}
    >
      <DialogTrigger asChild>
        <Button variant="destructive">Create New Link</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md w-full overflow-auto">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
        </DialogHeader>

        {formValues.longUrl && (
          <div className="flex justify-center my-4">
            <QRCode ref={ref} size={200} value={formValues.longUrl} />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Input
            id="title"
            placeholder="Short Link's Title"
            value={formValues.title}
            onChange={handleChange}
          />
          {errors.title && <Error message={errors.title} />}

          <Input
            id="longUrl"
            placeholder="Enter your Loooong URL"
            value={formValues.longUrl}
            onChange={handleChange}
          />
          {errors.longUrl && <Error message={errors.longUrl} />}

          <div className="flex items-center gap-2 flex-wrap">
            <Card className="p-2 whitespace-nowrap">bvx.vercel.app</Card> /
            <Input
              id="customUrl"
              placeholder="Custom Link (optional)"
              value={formValues.customUrl}
              onChange={handleChange}
              className="flex-1 min-w-0"
            />
          </div>

          {error && <Error message={error.message || "Error creating link"} />}
        </div>

        <DialogFooter className="sm:justify-start mt-4">
          <Button
            type="button"
            variant="destructive"
            onClick={createNewLink}
            disabled={loading}
          >
            {loading ? <BeatLoader size={10} color="white" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
