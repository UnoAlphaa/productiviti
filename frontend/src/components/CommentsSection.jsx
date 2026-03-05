import { useState } from "react"
import { useCreateComment, useDeleteComment } from "../hooks/useComments"
import { useAuth, SignInButton } from "@clerk/clerk-react"
import { SendIcon, Trash2Icon, MessageSquareIcon, LogInIcon } from "lucide-react"

function CommentsSection({productId, comments=[], currentUserId}) {
    const {isSignedIn} = useAuth();
    const createComment = useCreateComment(); 
    const deleteComment = useDeleteComment(productId);
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!content.trim()) return;
        createComment.mutate({productId,content}, {onSuccess : ()=>setContent("")});
    }

  return (
    <div className="space-y-4">
        <div className="flex items-center gap-2">
            <MessageSquareIcon className="size-5" />
            <h2 className="font-bold">Comments</h2>
            <span className="badge badge-neutral badge-sm">{comments.length}</span>
        </div>

        {isSignedIn ? (
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input type="text"
                placeholder="Add a comment"
                className="input input-bordered input-sm flex-1 bg-base-200"
                value={content}
                onChange= {(e)=>setContent(e.target.value)}
                disabled = {createComment.isPending}
                />

                <button
                type="submit"
                className="btn btn-square btn-primary btn-sm"
                disabled={createComment.isPending || !content.trim() }
                >
                    {createComment.isPending ? (
                        <span className="loading loading-spinner loading-xs" />
                    ):(
                        <SendIcon className="size-4" />
                    )}
                </button>
            </form>
        ):(
            <div className="flex bg-base-200 items-center justify-between rounded-lg p-3">
                <span className="text-sm">sign in to join the conversation</span>
                <SignInButton mode="modal">
                    <button className="flex items-center gap-1 btn btn-primary btn-sm">
                        <LogInIcon className="size-4" />
                        sign in
                    </button>
                </SignInButton>
            </div>
        )}

        <div className="space-y-2 max-h-80 overflow-hidden">
            {comments.length === 0 ? (
                <div className="text-center py-8 text-base-content/50">
                    <MessageSquareIcon className="size-8 mx-auto mb-2 opacity-30"/>
                    <p>No comments Yet, Be the first!</p>
                </div>
            ):(
                comments.map(comment => (
                    <div className="chat chat-start" key={comment.id}>
                        <div className="avatar chat-image">
                            <div className="w-8 rounded-full">
                                <img src={comment.user?.imageUrl} alt={comment.user?.name}/>
                            </div>
                        </div>

                        <div className="chat-header text-xs opacity-70 mb-2">
                            {comment.user?.name}
                            <time className="ml-2 text-xs opacity-50">
                                {new Date(comment.createdAt).toLocaleDateString()}
                            </time>
                        </div>

                        <div className="chat-bubble chat-bubble-neutral text-sm">{comment.content}</div>
                         {currentUserId === comment.userId && (
                <div className="chat-footer">
                  <button
                    onClick={() =>
                      confirm("Delete?") && deleteComment.mutate({ commentId: comment.id })
                    }
                    className="btn btn-ghost btn-xs text-error"
                    disabled={deleteComment.isPending}
                  >
                    {deleteComment.isPending ? (
                      <span className="loading loading-spinner loading-xs" />
                    ) : (
                      <Trash2Icon className="size-3" />
                    )}
                  </button>
                </div>
              )}
                    </div>
                ))
            )}
        </div>

    </div>
  )
}

export default CommentsSection