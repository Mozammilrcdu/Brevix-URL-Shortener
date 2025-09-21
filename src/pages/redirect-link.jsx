import {storeClicks} from "@/db/apiClicks";
import {getLongUrl} from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {BarLoader} from "react-spinners";

const RedirectLink = () => {
  const { id } = useParams();
  const { loading, data, fn } = useFetch(getLongUrl, id);

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!loading && data?.id && data?.original_url) {
      // Ensure URL has protocol
      let url = data.original_url;
      if (!/^https?:\/\//i.test(url)) {
        url = "https://" + url;
      }
      storeClicks({ id: data.id, originalUrl: url });
    }
  }, [loading, data]);

  return (
    <div>
      <BarLoader width="100%" color="#36d7b7" />
      <br />
      Redirecting...
    </div>
  );
};

export default RedirectLink;
