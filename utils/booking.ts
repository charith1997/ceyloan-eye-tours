export const sendStatus = (status: string) => {
  switch (status) {
    case "all":
      return 0;
    case "pending":
      return 1;
    case "confirmed":
      return 2;
    case "cancelled":
      return 3;
    case "completed":
      return 4;
    default:
      return 0;
  }
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-200 text-green-800 border-green-200";
    case "pending":
      return "bg-yellow-200 text-yellow-800 border-yellow-200";
    case "cancelled":
      return "bg-red-200 text-red-800 border-red-200";
    case "confirmed":
      return "bg-blue-200 text-blue-800 border-blue-200";
    default:
      return "bg-gray-200 text-gray-800 border-gray-200";
  }
};

export const generatePaymentStatusColor = (
  status: "success" | "pending" | "canceled" | "failed" | "chargedback"
) => {
  switch (status) {
    case "success":
      return "bg-green-100 text-green-800 border-green-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "failed":
      return "bg-red-100 text-red-800 border-red-200";
    case "canceled":
      return "bg-gray-100 text-gray-800 border-gray-200";
    case "chargedback":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-blue-100 text-blue-800 border-blue-200";
  }
};
