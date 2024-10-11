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

export async function PUT(req, { params }) {
    const { id } = params;  // Extract id from params
    const body = await req.json();
    const { _id, ...updateData } = body;
  
    // Ensure the _id matches the id in the URL
    if (_id !== id) {
      return new Response("ID mismatch", { status: 400 });
    }
  
    const customer = await Customer.findByIdAndUpdate(id, updateData, {
      new: true,
    });
  
    if (!customer) {
      return new Response("Customer not found", { status: 404 });
    }
    
    return Response.json(customer);
  }
