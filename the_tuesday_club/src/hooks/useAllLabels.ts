import useData from "./reuseableHooks/useData";


// Typen for et label
interface Label {
  label_name: string;
}

// Specialiseret hook til at hente alle labels
const useAllLabels = () => {
  return useData<Label>("/api/csv/labels/all");
};

export default useAllLabels;
