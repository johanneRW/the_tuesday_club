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
} from "@chakra-ui/react";

interface CustomRangeSliderProps {
 
  useDataHook: () => { minPrice: number | undefined; maxPrice: number | undefined; isLoading: boolean; error: string | null };
  selectedRange: [number, number] | undefined;
  onSelectRange: (range: [number, number]) => void;
}

const CustomRangeSlider = ({  useDataHook, selectedRange, onSelectRange }: CustomRangeSliderProps) => {
  const { minPrice, maxPrice, isLoading, error } = useDataHook();

  const [range, setRange] = useState<[number, number] | undefined>(selectedRange);

  useEffect(() => {
    if (minPrice !== undefined && maxPrice !== undefined && !selectedRange) {
      setRange([minPrice, maxPrice]);
    }
  }, [selectedRange, minPrice, maxPrice]);

  const handleRangeChange = (value: [number, number]) => {
    setRange(value);
    onSelectRange(value);
  };

  if (isLoading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box padding={4}>
      <Heading size="xs">Price Range</Heading>
      <Text fontSize="sm">  {range ? `${range[0]} kr - ${range[1]} kr` : ""}</Text>

      {range && minPrice !== undefined && maxPrice !== undefined && (
        <RangeSlider
          min={minPrice}
          max={maxPrice}
          step={10}
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
    </Box>
  );
};

export default CustomRangeSlider;
