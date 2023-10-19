import { Media } from "../types/Common/media-type";
import Image from "next/image";

type AuthorPreviewProps = {
  name: string;
  photo: Media;
  jobTitle: string;
};

export default function AuthorPreview({ name, photo, jobTitle }: AuthorPreviewProps) {
  return (
    <div className="flex flex-col items-start gap-4 mb-12 md:flex-row md:items-center">
      {photo && (
        <Image
          src={photo.fileUrl}
          width={100}
          height={100}
          className="rounded-full mr-4 w-28 h-28 object-cover"
          alt={photo.name}
        />
      )}
      <div>
        <h2 className="text-3xl leading-snug">{name}</h2>
        <p>{jobTitle}</p>
      </div>
    </div>
  );
}
