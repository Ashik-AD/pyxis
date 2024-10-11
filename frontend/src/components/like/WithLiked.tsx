import React, { CSSProperties, useEffect, useState } from "react";
import Alert from "../alert/Alert";
import AlertText from "../alert/AlertText";
import { ax } from "../../config/default";
import { AxiosError } from "axios";
import useUser from "../../hooks/useUser";
import useDispatch from "../../hooks/useDispatch";

export interface WithLikedProps {
  id: string;
  posterPath: string;
  title: string;
  duration: number;
  color?: string;
  release_date?: Date | string;
  media_type: "tv" | "movie";
  isLiked?: true | false | null;
  handleLikeAfter?: (() => void) | any;
  classNames?: string;
  styles?: CSSProperties;
  handleLike?: {
    add: () => void;
    remove: () => void;
  };
}

function WithLiked(WrappedComponent: React.ComponentType<WithLikedProps>) {
  const ComponentWithLike = (props: WithLikedProps) => {
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const user = useUser();
    const storeDispatch = useDispatch();

    const { id, title, posterPath, duration, release_date, media_type } = props;
    useEffect(() => {
      return () => {
        setError("");
        setSuccess("");
      };
    }, []);

    const handleAddLiked = async () => {
      try {
        const prepareLike = {
          liked_id: id,
          poster_url: posterPath,
          title,
          duration,
          release_date,
          media_type,
        };
        const { data } = await ax.post(`/${user?.id}/liked/add`, {
          data: prepareLike,
        });
        setSuccess(data.message);
        storeDispatch({ type: "ADD_LIKED_ITEM", payload: prepareLike });
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err.response?.data?.message);
          return;
        }
        setError(`Can't add like`);
      }
    };

    const handleRemoveLiked = async () => {
      try {
        await ax.post(`/${user?.id}/liked/delete`, {
          data: { likedId: id },
        });
        setSuccess(`${title} removed from you library`);
        storeDispatch({ type: "REMOVE_LIKED", payload: id });
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err.response?.data?.message || "connection erroro");
          return;
        }
        setError(`Can't remove from your library`);
      }
    };

    const handleClearMsg = () => {
      setError("");
      setSuccess("");
    };

    return (
      <>
        <WrappedComponent
          {...props}
          handleLike={{ add: handleAddLiked, remove: handleRemoveLiked }}
        />
        {(error || success) && (
          <Alert handleAlert={handleClearMsg}>
            <AlertText
              type={error ? "warn" : "info"}
              text={error ? error : success}
            />
          </Alert>
        )}
      </>
    );
  };
  return ComponentWithLike;
}

export default WithLiked;
