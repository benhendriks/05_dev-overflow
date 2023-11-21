import { Badge } from "@/components/ui/badge";
import Link from 'next/link';

interface Props {
  _id: string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
}

const RenderTag = ({ _id, name, totalQuestions, showCount }:Props) => {
  return (
      <Link
        href={`/tag/${_id}`}
        className="flex justify-between gap-2"
      >
        <Badge className="px-4 py-2 uppercase border-none rounded-md subtle-medium background-light700_dark300 text-light400_light500">{name}</Badge>
      {showCount && (
        <p className="small-medium text-dark500_light700">{totalQuestions}</p>
      )}
      </Link>
  )
}

export default RenderTag
