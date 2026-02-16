import { useParams } from "react-router-dom";

export default function ProductPage() {
  const { id } = useParams();

  return (
    <div className="container">
      <h1>Product #{id}</h1>
      <p>Product details coming soon...</p>
    </div>
  );
}
