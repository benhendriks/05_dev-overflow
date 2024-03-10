"use client";

import { deleteAnswer } from '@/lib/actions/answer.action';
import { deleteQuestion } from '@/lib/actions/question.action';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
  itemId: string;
  type: string;
}

const EditDeletActions = ( {itemId, type}:Props ) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/question/edit/${JSON.parse(itemId)}`);
  }
  const handleDelete = async () => {
    if (type === 'Question') {
      // deleteQuestion(itemId);
      await deleteQuestion({ questionId: JSON.parse(itemId), path: pathname});
    } else if (type === 'Answer') {
      // deleteAnswer(itemId);
      await deleteAnswer({ answerId: JSON.parse(itemId), path: pathname });
    }
  }
  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === 'Question' && (
        <Image
        src="/assets/icons/edit.svg"
        width={14}
        height={14}
        alt="Edit"
        className='cursor-pointer object-contain'
        onClick={handleEdit}
        />
      )}
      <Image
        src="/assets/icons/trash.svg"
        width={14}
        height={14}
        alt="Delete"
        className='cursor-pointer object-contain'
        onClick={handleDelete}
      />
    </div>
  )
}

export default EditDeletActions
