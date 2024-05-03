import React, { CSSProperties, useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store/Store";
import Alert from "../alert/Alert";
import AlertText from "../alert/AlertText";
import { ax } from "../../config/default";
interface PropsType {
  id: string;
  posterPath: string;
  title: string;
  duration: number;
  color?: string;
  release_date: Date | string | null;
  media_type: "tv" | "movie" | string;
  isLiked?: true | false | null;
  handleLikeAfter?: (() => void) | any;
  classNames?: string;
  styles?: CSSProperties;
}

function WithLiked(WrappedComponent: React.ComponentType<any>) {
  const ComponentWithLike = (props: PropsType) => {
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const {
      store: { user },
    } = useContext(StoreContext);
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
        const { data, status } = await ax.post(`/${user.id}/liked/add`, {
          data: prepareLike,
        });
        if (status === 200) {
          console.log(data.message);
          setError(data.message);
          return false;
        }
        setSuccess(data.message);
        return true;
      } catch (error) {
        console.log(error);
        setError(`Can't add like`);
        return false;
      }
    };

    const handleRemoveLiked = async () => {
      try {
        const { data, status } = await ax.post(`/${user.id}/liked/delete`, {
          data: { likedId: id },
        });
        if (status === 201) {
          setSuccess(`${title} removed from you library`);
          return true;
        }
        setError(data);
        return false;
      } catch (error) {
        console.log(error);
        setError(`Can't remove from your library`);
        return false;
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
