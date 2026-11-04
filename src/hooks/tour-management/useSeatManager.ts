import { useEffect, useMemo, useState } from "react";
import type { ChairType } from "@/enums/tour-management/ChairType";
import type { Seat } from "@/interfaces/tour/Seat";
import { useTourManagement } from "./useTourManagement";

const ALL = "ALL";

/** Seats of one vehicle with search, type and status filters, and the edit dialog flow. */
export function useSeatManager(transportId: number) {
  const { seats, fetchSeats, isLoading, isMutating, handleUpdateSeat } = useTourManagement();
  const [isTableOpen, setIsTableOpen] = useState(false);
  const [editingSeat, setEditingSeat] = useState<Seat | null>(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>(ALL);
  const [filterStatus, setFilterStatus] = useState<string>(ALL);

  useEffect(() => {
    if (transportId) void fetchSeats(transportId);
  }, [transportId, fetchSeats]);

  const totals = useMemo(() => seats.reduce((acc, seat) => {
    acc[seat.chairType] = (acc[seat.chairType] || 0) + 1;
    return acc;
  }, {} as Partial<Record<ChairType, number>>), [seats]);

  const filteredSeats = useMemo(() => seats.filter((seat) =>
    seat.seatCode.toLowerCase().includes(search.toLowerCase())
    && (filterType === ALL || seat.chairType === filterType)
    && (filterStatus === ALL || seat.status === filterStatus)), [seats, search, filterType, filterStatus]);

  const save = async (updated: Seat) => {
    if (!updated.id) return;
    await handleUpdateSeat(updated.id, updated, transportId);
    setEditingSeat(null);
    setIsTableOpen(true);
  };
  const edit = (seat: Seat) => { setIsTableOpen(false); setEditingSeat(seat); };
  const closeEditor = () => { setEditingSeat(null); setIsTableOpen(true); };
  const resetFilters = () => { setSearch(""); setFilterType(ALL); setFilterStatus(ALL); };

  return {
    seats, filteredSeats, totals, isLoading, isMutating, isTableOpen, setIsTableOpen, editingSeat,
    search, setSearch, filterType, setFilterType, filterStatus, setFilterStatus, save, edit, closeEditor, resetFilters,
  };
}
