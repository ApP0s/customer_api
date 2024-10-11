"use client"; // Use this if you're using client-side features like hooks
import { useEffect, useState } from "react";

export default function CustomerDetail({ params }) {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const APIBASE = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`${APIBASE}/customer/${params.id}`);
        if (!response.ok) {
          throw new Error(`Customer not found (status: ${response.status})`);
        }
        const data = await response.json();
        setCustomer(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [params.id, APIBASE]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="customer-detail">
      <h1 className="text-2xl">Customer Details</h1>
      <p><strong>Name:</strong> {customer.name}</p>
      <p><strong>Date of Birth:</strong> {new Date(customer.dateOfBirth).toLocaleDateString()}</p>
      <p><strong>Member Number:</strong> {customer.memberNumber}</p>
      <p><strong>Interests:</strong> {customer.interests}</p>
      {/* You can add more fields as necessary */}
    </div>
  );
}
