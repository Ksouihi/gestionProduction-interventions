import { useState } from "react";
import { Comment } from "../../models/Intervention";
import { User } from "../../models/User";
import moment from "moment";

type CommentRowProps ={
    commentObj: Comment;
    loggedUser: User;
    setShowTextArea: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedComment:  React.Dispatch<React.SetStateAction<Comment | undefined>>;
}

const CommentRow = ({commentObj,loggedUser,setSelectedComment,setShowTextArea}:CommentRowProps) => {
    
    const {id,comment,date,user} = commentObj;
    const isAdmin = loggedUser && [''].includes(loggedUser.role.role);
    const updateCommentHanlder = () => {
        setSelectedComment(commentObj);
        setShowTextArea(true);
    }
    return (
        <div
            className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
        >

            <div className="flex flex-1 items-center justify-between">
                <div>
                    {isAdmin  &&  <h5 className="font-medium">{user.prenom} {user.nom}</h5>}
                    <p className="flex flex-col">
                        <span className="text-sm">{comment}</span>
                        {isAdmin && <span className="text-xs">{date}</span>}
                    </p>
                </div>
                <button className="text-white bg-meta-3 px-2 rounded text-sm font-semibold" onClick={updateCommentHanlder}>modifier</button>
            </div>
        </div>
    );
}


type CommentTextAreaProps = {
    loggedUser: User;
    comments: Comment[];
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
    setShowTextArea: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedComment:  React.Dispatch<React.SetStateAction<Comment | undefined>>;
} & Partial<Comment>

const CommentTextArea = ( {loggedUser, comment,date,id,idIntervention,comments, setComments, setShowTextArea, setSelectedComment}:CommentTextAreaProps) => {
    const [commentValue, setCommentValue] = useState<string>(comment ?? '');
    const saveComment = () => {
        const updatedComment: Comment = {
            id: id ??  Date.now().toString(),
            comment: commentValue,
            date: date ?? moment().format('lll'),
            user: loggedUser,
            idIntervention: idIntervention ?? '0'
        }

        const updatedComments = [updatedComment, ...comments.filter((c) =>c.id !== updatedComment.id)];
        setComments(updatedComments)
        localStorage.setItem('comments', JSON.stringify(updatedComments))
        setShowTextArea(false);
        setSelectedComment(undefined);
    }
    return (
        <div className="flex gap-2">
            <textarea value={commentValue} onChange={(e)=>setCommentValue(e.target.value)} className="border border-gray-100 rounded w-full bg-meta-9"></textarea>
            <button className="bg-meta-3 px-2 text-white rounded" onClick={saveComment}>enregistrer</button>
        </div>
        
    )

}
const InterventionComments = ({idIntervention}: {idIntervention: number}) => {
    const commentsJson = localStorage.getItem('comments');
    const comments: Comment[] = commentsJson ? JSON.parse(commentsJson) : [];

    const [commentsState, setCommentsState] = useState<Comment[]>(comments);
    const [selectedComment, setSelectedComment] = useState<Comment|undefined>(undefined);

    const filtredComments: Comment[] = commentsState.filter((comment) => comment.idIntervention === idIntervention && comment.id !== selectedComment?.id);
    
    const loggedUserJson = localStorage.getItem('user');
    const loggedUser: User|undefined =  loggedUserJson ? JSON.parse(loggedUserJson): undefined;

    const [showTextArea, setShowTextArea] = useState<boolean>(filtredComments.length===0)
    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4 px-7.5">
            <div className="flex items-center justify-between  mb-6">
                <h4 className="  text-xl font-semibold text-black dark:text-white">
                    Commentaires
                </h4>
                <button className="bg-primary p-2 text-white rounded" onClick={()=>setShowTextArea(true)}>Ajouter</button>
            </div>

        <div>
            {loggedUser && showTextArea && <CommentTextArea loggedUser={loggedUser} {...selectedComment} comments={commentsState} setComments={setCommentsState} setShowTextArea={setShowTextArea} idIntervention={idIntervention} setSelectedComment={setSelectedComment} />}
            {loggedUser && filtredComments.length > 0 && filtredComments.map((comment) => <CommentRow key={comment.id} commentObj={comment} loggedUser={loggedUser} setSelectedComment={setSelectedComment} setShowTextArea={setShowTextArea} />)}
        </div>
        </div>
    );
};

export default InterventionComments;
