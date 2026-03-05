import CommentsSection from "../components/commentsSection";
import { ArrowLeftIcon, EditIcon, Trash2Icon, CalendarIcon, UserIcon } from "lucide-react";
import {useAuth} from "@clerk/clerk-react"
import { useParams, useNavigate,Link, data } from "react-router";
import { useProduct,useDeleteProduct, } from "../hooks/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";

function ProductPage () {
  const {id} = useParams();
  const {userId} = useAuth();
  const navigate = useNavigate();
  const {data : product, isLoading, error} = useProduct(id);
  const deleteProduct = useDeleteProduct();

  const handleDelete = ()=>{
    if(confirm("Confirm you want to delete this Product?")){
      deleteProduct.mutate( id,{onSuccess : ()=> navigate("/")})
    }
  }

  if(isLoading) return <LoadingSpinner />

  if(error || !product) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-error">Product Not Found</h2>
            <Link to="/" className="btn btn-primary btn-sm">
            Go Home
            </Link>
          </div>
      </div>
    )
  }
  const isOwner = userId === product.userId;
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        {/* left side */}
        <Link to="/" className="flex items-center btn btn-ghost btn-sm">
        <ArrowLeftIcon size={16} />
        Back 
        </Link>

        {/* Right side */}
        {isOwner && (
          <div className="flex gap-1">
          <Link to={`/edit/${product.id}`} className="btn btn-ghost btn-sm">
            Edit
          </Link>

          <button
          className="btn-error btn btn-sm gap-1"
          onClick={handleDelete}
          disabled={deleteProduct.isPending}
          >
            {deleteProduct.isPending ? (
              <span className="loading loading-spinner loading-xs" />
            ):(
              <Trash2Icon />
            )}
            Delete
          </button>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
          <div className="card bg-base-300 p-1">
            <figure className="p-4">
              <img src={product.imageUrl} alt={product.title}
              className="rounded-xl object-cover w-full h-80"
              />
            </figure>
          </div>
        
        <div className="card base-300">
          <div className="card-body">
            <div className="card-title text-2xl">
                <h1>{product.title}</h1>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-base-content/60 my-2">
              <div className="flex items-center gap-1">
                <CalendarIcon className="size-4" />
                {new Date(product.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <UserIcon className="size-4" />
                {product.user?.name}
              </div>
            </div>

             <div className="divider my-2"></div>

              <p className="text-base-content/80 leading-relaxed">{product.description}</p>

               {product.user && (
              <>
                <div className="divider my-2"></div>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={product.user.imageUrl} alt={product.user.name} />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">{product.user.name}</p>
                    <p className="text-xs text-base-content/50">Creator</p>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
          
      </div>
{/* Comments section, where we pass the id, comments and userid as props into the component */}
            <div className="card bg-base-300">
              <div className="card-body">
                <CommentsSection productId={id} comments={product.comments} currentUserId={userId}/>
              </div>
            </div>
        

    </div>
  )
}

export default ProductPage