import React, { useEffect, useState } from "react";
import Button from "@/components/atoms/Button";
import NavigationContainer from "@/components/containers/NavigationContainer";
import SearchContainer from "@/components/containers/SearchContainer";
import AdminCarsPage from "./car/AdminCarsPage";
import AdminVansPage from "./van/AdminVansPage";
import AdminBusPage from "./bus/AdminBusPage";
import { useLazyGetAllVehiclesPaginatedQuery } from "@/services/vehicleApi";
import VehicleDetails from "./VehicleDetails";
import AddVehicle from "./AddVehicle";
import DeleteVehicle from "./DeleteVehicle";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { setCurrentPage, setTotalPages } from "@/features/paginatorSlice";

const AdminVehiclesPage = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [show, setShow] = useState(false);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [details, setDetails] = useState<any | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [getAllVehiclesPaginated] = useLazyGetAllVehiclesPaginatedQuery();
  const { currentPage, totalPages } = useAppSelector(
    (state) => state.paginator
  );
  const dispatch = useDispatch();

  const getAllVehicles = async () => {
    const params: any = {
      page: currentPage,
      size: 10,
    };

    if (searchQuery.trim()) {
      params.search = searchQuery.trim();
    }

    const { data } = await getAllVehiclesPaginated(params);

    if (data?.success) {
      setVehicles(data.data);
      dispatch(setTotalPages(data.pagination.totalPages));
    }
  };

  useEffect(() => {
    if (currentPage) {
      getAllVehicles();
    }
  }, [currentPage, searchQuery]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (totalPages) {
      if (currentPage > totalPages) {
        dispatch(setCurrentPage(1));
      }
    }
  }, [totalPages]);

  const handleShowDetails = (details: any) => {
    setShow(true);
    setDetails(details);
  };

  const handleDeleteVehicle = (details: any) => {
    setDeleteModal(true);
    setDetails(details);
  };

  const handleEditVehicle = (details: any) => {
    setShowAddVehicle(true);
    setDetails(details);
  };

  return (
    <>
      <NavigationContainer>
        <SearchContainer
          searchPlaceholder={
            activeTab === "tab1"
              ? "Search Cars..."
              : activeTab === "tab2"
              ? "Search Vans..."
              : "Search Busses..."
          }
          title="Vehicles"
          buttonName="Add Vehicle"
          onClick={() => setShowAddVehicle(true)}
          onSearchChange={handleSearchChange}
        />
        <div className="w-full">
          <div className="md:max-w-xs flex">
            <Button
              label="Cars"
              className={`flex-1 p-2 text-center text-sm cursor-pointer ${
                activeTab === "tab1" ? "border-b-2 text-red" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("tab1")}
            />
            <Button
              label="Vans"
              className={`flex-1 p-2 text-center text-sm cursor-pointer ${
                activeTab === "tab2" ? "border-b-2 text-red" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("tab2")}
            />
            <Button
              label="Busses"
              className={`flex-1 p-2 text-center text-sm cursor-pointer ${
                activeTab === "tab3" ? "border-b-2 text-red" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("tab3")}
            />
          </div>

          <div className="pt-8">
            {activeTab === "tab1" && (
              <AdminCarsPage
                cars={vehicles}
                handleView={handleShowDetails}
                handleDelete={handleDeleteVehicle}
                handleEdit={handleEditVehicle}
              />
            )}
            {activeTab === "tab2" && (
              <AdminVansPage
                vans={vehicles}
                handleView={handleShowDetails}
                handleDelete={handleDeleteVehicle}
                handleEdit={handleEditVehicle}
              />
            )}
            {activeTab === "tab3" && (
              <AdminBusPage
                busses={vehicles}
                handleView={handleShowDetails}
                handleDelete={handleDeleteVehicle}
                handleEdit={handleEditVehicle}
              />
            )}
          </div>
        </div>
      </NavigationContainer>

      {show && (
        <VehicleDetails
          vehicle={details}
          onClose={() => {
            setShow(false);
            setDetails(null);
          }}
        />
      )}

      {showAddVehicle && (
        <AddVehicle
          show={showAddVehicle}
          onClose={() => {
            setShowAddVehicle(false);
            setDetails(null);
          }}
          initialValues={
            Boolean(details)
              ? {
                  ...details,
                  passengerCapacity: details ? details.passenger_capacity : "",
                  ownerContact: details ? details.owner_contact : "",
                  vehicleType: "car",
                }
              : null
          }
          isEdit={Boolean(details)}
        />
      )}

      {deleteModal && (
        <DeleteVehicle
          show={deleteModal}
          onClose={() => {
            setDeleteModal(false);
            setDetails(null);
          }}
          selectedID={details.id}
        />
      )}
    </>
  );
};

export default AdminVehiclesPage;
