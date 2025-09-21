import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { getLongUrl } from "@/db/apiUrls";
import { storeClicks } from "@/db/apiClicks";
import useFetch from "@/hooks/use-fetch";

const RedirectLink = () => {
  const { id } = useParams();
  const { loading, data, fn: fetchUrl } = useFetch(getLongUrl, id);

  useEffect(() => {
    fetchUrl();
  }, []);

  useEffect(() => {
    if (!loading && data?.id && data?.original_url) {
      let url = data.original_url;

      if (!/^https?:\/\//i.test(url)) {
        url = "https://" + url;
      }

      storeClicks({ id: data.id }).catch(console.error);

      setTimeout(() => {
        window.location.href = url;
      }, 50); // 50ms delay
    }
  }, [loading, data]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <BarLoader width="80%" color="#36d7b7" />
      <p className="mt-4 text-gray-700">Redirecting...</p>
    </div>
  );
};

export default RedirectLink;
