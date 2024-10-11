import Customer from "@/models/Customer";

export async function DELETE(request, { params }) {
  const id = params.id;
  return Response.json(await Customer.findByIdAndDelete(id));
}

export async function GET(request, { params }) {
  const { id } = params; // Extract the ID from the parameters

  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return new Response("Customer not found", { status: 404 });
    }
    return Response.json(customer);
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
