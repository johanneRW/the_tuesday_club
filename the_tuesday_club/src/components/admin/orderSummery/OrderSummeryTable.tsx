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
    <Box maxW="100%" mx="auto" mt="2" overflowX="auto">
    <Table variant="striped" size="sm" minWidth="1200px">
  <Thead>
    <Tr>
      <Th width="10%">Select</Th> {/* Gør Select-kolonnen bredere */}
      
      <Th>Name</Th>
      <Th>Address</Th>
      <Th>Total Quantity</Th>
      <Th>Total Price</Th>
    </Tr>
  </Thead>
  <Tbody>
    {orderSummery.map((summary) => (
      <React.Fragment key={`${summary.user_id}`}>
        {/* Hovedoplysninger */}
        <Tr>
          <Td  >
            <Checkbox
              isChecked={selectedUserIds.has(summary.user_id)}
              onChange={(e) =>
                handleCheckboxChange(summary.user_id, e.target.checked)
              }
            />
          </Td>
          <Td rowSpan={2}>{`${summary.first_name} ${summary.last_name}`}</Td>
          <Td rowSpan={2}>{summary.address}</Td>
          <Td>{summary.total_quantity}</Td>
          <Td>{summary.total_price.toFixed(2)}</Td>
        </Tr>
        {/* Blank række mellem hovedoplysninger og albumtabel */}
        <Tr>
        
        </Tr>
        {/* Indlejret tabel for albumdetaljer */}
        <Tr>
          <Td colSpan={6}>
            <Table size="sm" width="100%">
              <Thead>
                <Tr>
                
                  <Th>Album Name</Th>
                  <Th>Artist Name</Th>
                  <Th>Units</Th>
                  <Th>Format</Th>
                  <Th>pr. item</Th>
                  <Th>Quantity</Th>
                  <Th>Sub total</Th>

                </Tr>
              </Thead>
              <Tbody>
                {summary.items.map((item, index) => (
                  <Tr key={`${summary.user_id}-${index}`}>
                    <Td>{item.album_name}</Td>
                    <Td>{item.artist_name}</Td>
                    <Td>{item.album_units}</Td>
                    <Td>{item.format}</Td>
                    <Td>{item.price_per_item.toFixed(2)}</Td>
                    <Td>{item.quantity}</Td>
                    <Td>{item.total_price.toFixed(2)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Td>
        </Tr>
      </React.Fragment>
    ))}
  </Tbody>
</Table>


    </Box>
  );
};

export default OrderSummeryTable;
