import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/utilities/AuthContext";
import { Center, Spinner, VStack, Text } from "@chakra-ui/react";
import { HomePage } from "@/pages/HomePage";
import LoginPage from "@/pages/User/Auth/LoginPage";
import RegisterPage from "@/pages/User/Auth/RegisterPage";
import ProfilePage from "@/pages/User/Auth/ProfilePage";
import { ForgetPassword } from "../User/Auth/ForgetPassword";
import ManageCountries from "@/pages/User/Admin/ManageCountries";
import AgencyNetworkPage from "@/pages/User/Admin/Agency/AgencyNetworkPage";
import AgencyDetail from "../Agency/AgencyDetail";
import CustomerCatalogPage from "@/pages/TourMangement/CustomerCatalogPage";
import AdminToursPage from "@/pages/TourMangement/AdminToursPage";
import TransportPage from "@/pages/TourMangement/TransportPage";
import MealsPage from "@/pages/TourMangement/MealsPage";
import TransportationDetailsPage from "@/pages/TourMangement/TransportationDetailsPage";
import TourCreatePage from "@/pages/TourMangement/TourCreatePage";
import { AdminTourDetailsPage } from "@/pages/TourMangement/AdminTourPageDetails";
import TourEditPage from "@/pages/TourMangement/TourEditPage";
import UsersPage from "@/pages/User/Admin/UsersPage";
import BookingPage from "@/pages/TourMangement/BookingPage";
import CustomerTicketsPage from "@/pages/TourMangement/Ticket/CustomerTicketsPage";
import CustomerTicketDetailPage from "@/pages/TourMangement/Ticket/CustomerTicketDetailPage";
import CustomerNotificationsPage from "@/pages/CustomerNotificationsPage";
import TransportationCreatePage from "@/pages/TourMangement/Transportation/TransportationCreatePage";
import UserRequestsPage from "@/pages/UserRequestsPage";
import UserRequestDetailsPage from "@/pages/UserRequestDetailsPage";
import TransactionTablePage from "@/pages/Transactions/TransactionTablePage";
import TransactionDetailsPage from "@/pages/Transactions/TransactionDetailsPage";
import PaymentTablePage from "@/pages/Payemnts/PaymentTablePage";
import PaymentDetailsPage from "@/pages/Payemnts/PaymentDetailsPage";

const PageLoader = () => (
  <Center h="100vh" w="100vw" bg="bg.canvas">
    <VStack gap={4}>
      <Spinner size="xl" color="blue.500"  />
      <Text color="fg.muted" fontWeight="bold" letterSpacing="widest" fontSize="xs">Authenticating...</Text>
    </VStack>
  </Center>
);

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin, loading } = useAuth();
  if (loading) return <PageLoader />;
  return isAdmin ? <>{children}</> : <Navigate to="/" replace />;
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <PageLoader />;
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/tours" element={<CustomerCatalogPage />} />
<Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      <Route path="/reserve/:tourId" element={<PrivateRoute><BookingPage /></PrivateRoute>} />
      <Route path="/my-bookings" element={<PrivateRoute><CustomerTicketsPage /></PrivateRoute>} />
      <Route path="/my-bookings/:id" element={<PrivateRoute><CustomerTicketDetailPage /></PrivateRoute>} />
      <Route path="/my-notifications" element={<PrivateRoute><CustomerNotificationsPage /></PrivateRoute>} />
      <Route path="/my-requests" element={<PrivateRoute><UserRequestsPage /></PrivateRoute>} />
      <Route path="/my-requests/:id" element={<PrivateRoute><UserRequestDetailsPage /></PrivateRoute>} />
<Route path="/transactions" element={<PrivateRoute><TransactionTablePage /></PrivateRoute>} />
      <Route path="/transactions/:id" element={<PrivateRoute><TransactionDetailsPage /></PrivateRoute>} />
<Route path="/payments" element={<PrivateRoute><PaymentTablePage /></PrivateRoute>} />
      <Route path="/payments/:id" element={<PrivateRoute><PaymentDetailsPage /></PrivateRoute>} />
<Route path="/admin/requests" element={<AdminRoute><UserRequestsPage /></AdminRoute>} />
      <Route path="/admin/requests/:id" element={<AdminRoute><UserRequestDetailsPage /></AdminRoute>} />
      <Route path="/admin/countries" element={<AdminRoute><ManageCountries /></AdminRoute>} />
      <Route path="/admin/agencies" element={<AdminRoute><AgencyNetworkPage /></AdminRoute>} />
      <Route path="/admin/agencies/:id" element={<AdminRoute><AgencyDetail /></AdminRoute>} />
      <Route path="/admin/users" element={<AdminRoute><UsersPage /></AdminRoute>} />
<Route path="/admin/transactions" element={<AdminRoute><TransactionTablePage /></AdminRoute>} />
      <Route path="/admin/transactions/:id" element={<AdminRoute><TransactionDetailsPage /></AdminRoute>} />
      <Route path="/admin/payments" element={<AdminRoute><PaymentTablePage /></AdminRoute>} />
      <Route path="/admin/payments/:id" element={<AdminRoute><PaymentDetailsPage /></AdminRoute>} />
<Route path="/admin/tours" element={<AdminRoute><AdminToursPage /></AdminRoute>} />
      <Route path="/admin/tours/create" element={<AdminRoute><TourCreatePage /></AdminRoute>} />
      <Route path="/admin/tours/edit/:id" element={<AdminRoute><TourEditPage /></AdminRoute>} />
      <Route path="/admin/tours/:id" element={<AdminRoute><AdminTourDetailsPage /></AdminRoute>} />
      <Route path="/admin/transports" element={<AdminRoute><TransportPage /></AdminRoute>} />
      <Route path="/admin/transports/create" element={<AdminRoute><TransportationCreatePage /></AdminRoute>} />
      <Route path="/admin/transports/:id" element={<AdminRoute><TransportationDetailsPage /></AdminRoute>} />
      <Route path="/admin/meals" element={<AdminRoute><MealsPage /></AdminRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
