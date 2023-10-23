import { Media } from "../types/Common/media-type";
import Image from "next/image";

type AuthorPreviewProps = {
  name: string;
  photo: Media;
  jobTitle: string;
  bio: string;
};

export default function AuthorPreview({ name, photo, jobTitle, bio }: AuthorPreviewProps) {
  return (
    <div className="flex flex-col items-start gap-4 mb-12 md:flex-row">
      {photo && (
        <Image
          src={photo.fileUrl}
          width={100}
          height={100}
          className="rounded-full mr-4 w-28 h-28 object-cover shrink-0"
          alt={photo.name}
        />
      )}
      <div className="w-full">
        <h2 className="text-3xl leading-snug">{name}</h2>
        <h5 className="bg-[#dfdfdf] px-2 py-1">{jobTitle}</h5>
        <p className="mt-4">{bio}</p>
      </div>
    </div>
  );
}
