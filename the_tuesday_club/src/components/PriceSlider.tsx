import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Spinner,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Text,
  Button,
} from "@chakra-ui/react";

interface PriceSliderProps {
  title: string;
  useDataHook: () => { minPrice: number | undefined; maxPrice: number | undefined; isLoading: boolean; error: string | null };
  selectedRange: [number, number] | undefined;
  onSelectRange: (range: [number, number]) => void;
}

const PriceSlider = ({ title, useDataHook, selectedRange, onSelectRange }: PriceSliderProps) => {
  const { minPrice, maxPrice, isLoading, error } = useDataHook();

  const [range, setRange] = useState<[number, number] | undefined>(selectedRange);

  // Sætter range til min og max værdier fra API'et, når de er hentet
  useEffect(() => {
    if (minPrice !== undefined && maxPrice !== undefined && !selectedRange) {
      setRange([minPrice, maxPrice]);
    }
  }, [selectedRange, minPrice, maxPrice]);

  // Funktion til at håndtere ændring af intervallet
  const handleRangeChange = (value: [number, number]) => {
    setRange(value);
    onSelectRange(value);
  };

  // Reset til min og max værdier
  const resetRange = () => {
    if (minPrice !== undefined && maxPrice !== undefined) {
      const resetValue: [number, number] = [minPrice, maxPrice];
      setRange(resetValue);
      onSelectRange(resetValue);
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box padding={4}>
      <Heading size="xs">{title}</Heading>
      <Text fontSize="sm">{range ? `${range[0]} kr - ${range[1]} kr` : ""}</Text>

      {range && minPrice !== undefined && maxPrice !== undefined && (
        <RangeSlider
          min={minPrice}
          max={maxPrice}
          step={1}
          value={range}
          onChange={handleRangeChange}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
      )}
      {/* Reset-knap */}
      <Button onClick={resetRange} mt={4} colorScheme="blue" size="sm">
        Reset range
      </Button>
    </Box>
  );
};

export default PriceSlider;
