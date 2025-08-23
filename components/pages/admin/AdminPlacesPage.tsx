// import React from "react";
// import { MapPin } from "lucide-react";
// import { Input } from "@/components/atoms/Input";
// import TextArea from "@/components/atoms/TextArea";
// import Button from "@/components/atoms/Button";
// import NavigationContainer from "@/components/containers/NavigationContainer";
// import SearchContainer from "@/components/containers/SearchContainer";
// import ListContainer from "@/components/containers/ListContainer";
// import Modal from "@/components/molecules/Modal";
// import Dropdown from "@/components/atoms/Dropdown";
// import { useGetAllPlacesQuery } from "@/services/placesApi";

// const cardDetails = (item: { name: string; location: string }) => (
//   <div className="flex flex-col gap-2">
//     <h3 className="text-md font-bold uppercase">{item.name}</h3>
//     <p className="flex text-sm gap-2 items-center">
//       <MapPin width={16} />
//       {item.location}
//     </p>
//   </div>
// );

// const priceDetails = () => null;

// const actionButtons = (item: { id: number; image_url: string }) => {
//   return (
//     <div className="flex gap-4">
//       <Button
//         label="Edit"
//         className="w-20 p-2 rounded-lg text-white bg-orange text-sm uppercase"
//       />
//       <Button
//         label="Delete"
//         className="w-20 p-2 rounded-lg text-white bg-red text-sm uppercase"
//       />
//     </div>
//   );
// };

// const mobileViewCardDetails = (item: { name: string; location: string }) => (
//   <div className="flex flex-col gap-1 text-sm">
//     <h3 className="font-bold uppercase">{item.name}</h3>
//     <p className="flex gap-2 items-center">
//       <MapPin width={16} />
//       {item.location}
//     </p>
//   </div>
// );

// const ToursList = [
//   {
//     id: 0,
//     imageURL: "/tour packages/package_1.jpg",
//   },
//   {
//     id: 1,
//     imageURL: "/tour packages/package_2.jpg",
//   },
//   {
//     id: 2,
//     imageURL: "/tour packages/package_3.jpg",
//   },
// ];

// const textFieldClassNames =
//   "w-full text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none";
// const labelClassNames = "block text-sm font-medium";

// const AdminPlacesPage = () => {
//   const [showModal, setShowModal] = React.useState(false);

//   const { data, error, isLoading } = useGetAllPlacesQuery();
//   const places = Array.isArray(data?.data) ? data.data : [];
//   return (
//     <>
//       <NavigationContainer>
//         <SearchContainer
//           searchPlaceholder="Search Places..."
//           title="Places"
//           buttonName="Add Place"
//           onClick={() => setShowModal(true)}
//         />
//         <ListContainer
//           cardDetails={cardDetails}
//           priceDetails={priceDetails}
//           actionButtons={actionButtons}
//           mobileViewCardDetails={mobileViewCardDetails}
//           list={places}
//         />
//       </NavigationContainer>

//       <Modal
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//         title="Place Form"
//       >
//         <form
//           id="place-form"
//           className="space-y-4 flex-1 overflow-y-auto py-2 pr-2"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <Input
//               label="Place Name:"
//               inputClassNames={textFieldClassNames}
//               labelClassNames={labelClassNames}
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <Input
//               label="Location 1:"
//               inputClassNames={textFieldClassNames}
//               labelClassNames={labelClassNames}
//             />
//             <Dropdown options={["Option 1", "Option 2"]} label="Location 2:" />
//           </div>

//           <TextArea
//             label="Description:"
//             labelClassNames={labelClassNames}
//             textAreaClassNames={`${textFieldClassNames} h-24`}
//           />

//           <div>
//             <label className="block text-sm font-medium">Images:</label>
//             <input
//               type="file"
//               className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:bg-orange-500 file:text-white hover:file:bg-orange-600"
//             />
//           </div>
//         </form>
//         <div className="flex justify-center gap-6 mt-4 bg-white">
//           <Button
//             onClick={() => setShowModal(false)}
//             className="w-full text-white px-8 py-2 rounded-lg cursor-pointer bg-[#1976D2] text-lg font-semibold uppercase"
//             label="Cancel"
//           />
//           <Button
//             type="submit"
//             form="tour-form"
//             className="w-full text-white px-8 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-red to-orange text-lg font-semibold uppercase"
//             onClick={() => {}}
//             label="Save"
//           />
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default AdminPlacesPage;
