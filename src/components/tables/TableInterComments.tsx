import { Comment } from "../models/Intervention";

type TableInterCommentsProps = {
    idIntervention: string;
}

const TableInterComments = ({idIntervention} : TableInterCommentsProps) => {
    const commentsJson = localStorage.getItem('comments');
    const comments: Comment[] = commentsJson ? JSON.parse(commentsJson) : [];
    const filtredComments: Comment[] = comments.filter((comment) => comment.idIntervention === idIntervention);
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Commentaire
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Utilisiateur
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>
        {filtredComments.map(comment => <CommentRow key={comment.id} {...comment} />)}
      </div>
    </div>
  );
};

export default TableInterComments;

const CommentRow = ({id, comment, user, date} : Comment) => {
    return (
        <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-3">
          <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <p className="hidden text-black dark:text-white sm:block">{comment}</p>
          </div>
          <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <p className="hidden text-black dark:text-white sm:block">{user.prenom} {user.nom}</p>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <button className='text-white bg-meta-3 px-4 py-2 rounded'>modifier</button>
          </div>
        </div>
    )
}
