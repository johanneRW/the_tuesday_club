import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Box,
  Spinner,
  Text,
} from "@chakra-ui/react";
import useOrderSummery, { OrderSummary, AlbumItem } from "../../../hooks/admin/useOrderSummery";

export interface OrderSummeryTableProps {
  onSelectionChange: (userIds: string[]) => void; // Returnér user_ids
}

const OrderSummeryTable: React.FC<OrderSummeryTableProps> = ({
  onSelectionChange,
}) => {
  const { data: orderSummery, isLoading, error } = useOrderSummery();
  const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(new Set());

  const handleCheckboxChange = (userId: string, checked: boolean) => {
    const updatedSelectedUserIds = new Set(selectedUserIds);
    if (checked) {
      updatedSelectedUserIds.add(userId);
    } else {
      updatedSelectedUserIds.delete(userId);
    }
    setSelectedUserIds(updatedSelectedUserIds);

    // Send de valgte user_ids tilbage til forælderen
    onSelectionChange(Array.from(updatedSelectedUserIds));
  };

  if (isLoading) {
    return (
      <Box textAlign="center" mt="10">
        <Spinner size="lg" />
        <Text>Loading orders...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt="10">
        <Text color="red.500">Error loading data</Text>
      </Box>
    );
  }

  if (!orderSummery || orderSummery.length === 0) {
    return (
      <Box textAlign="center" mt="10">
        <Text>No order summaries found.</Text>
      </Box>
    );
  }

  return (
    <Box maxW="1200px" mx="auto" mt="10" overflowX="auto">
      <Table variant="striped" size="sm" minWidth="1000px">
        <Thead>
          <Tr>
            <Th>Select</Th>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Address</Th>
            <Th>Total Quantity</Th>
            <Th>Total Price</Th>
            <Th>Album Name</Th>
            <Th>Artist Name</Th>
            <Th>Format</Th>
            <Th>Quantity</Th>
            <Th>Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orderSummery.map((summary) => (
            <React.Fragment key={`${summary.user_id}`}>
              {/* Parent row for address and summary */}
              <Tr>
                <Td rowSpan={summary.items.length + 1}>
                  <Checkbox
                    isChecked={selectedUserIds.has(summary.user_id)}
                    onChange={(e) =>
                      handleCheckboxChange(summary.user_id, e.target.checked)
                    }
                  />
                </Td>
                <Td rowSpan={summary.items.length + 1}>{summary.first_name}</Td>
                <Td rowSpan={summary.items.length + 1}>{summary.last_name}</Td>
                <Td rowSpan={summary.items.length + 1}>{summary.address}</Td>
                <Td rowSpan={summary.items.length + 1}>
                  {summary.total_quantity}
                </Td>
                <Td rowSpan={summary.items.length + 1}>
                  {summary.total_price.toFixed(2)}
                </Td>
              </Tr>
              {/* Rows for individual album items */}
              {summary.items.map((item: AlbumItem) => (
                <Tr key={item.album_name}>
                  <Td>{item.album_name}</Td>
                  <Td>{item.artist_name}</Td>
                  <Td>{item.format}</Td>
                  <Td>{item.quantity}</Td>
                  <Td>{item.price.toFixed(2)}</Td>
                </Tr>
              ))}
            </React.Fragment>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default OrderSummeryTable;
