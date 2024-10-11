import Customer from "@/models/Customer";

export async function POST(request) {
  const body = await request.json();
  console.log(body);
  const customer = new Customer(body);
  await customer.save();
  return Response.json(customer);
}

export async function GET() {
  return Response.json(await Customer.find());
}

export async function PUT(request) {
  const body = await request.json();
  const { _id, ...updateData } = body;
  const customer = await Customer.findByIdAndUpdate(_id, updateData, {
    new: true,
  });
  if (!customer) {
    return new Response("Customer not found", { status: 404 });
  }
  console.log(body);
  return Response.json(customer);
}
