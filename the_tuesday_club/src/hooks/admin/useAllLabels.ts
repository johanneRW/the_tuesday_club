import useData from "../reuseableHooks/useData";


// Typen for et label
interface Label {
  label_name: string;
}

//hook til at hente alle labels bruges til indlæsning af csv
const useAllLabels = () => {
  return useData<Label>("/api/imports/labels/all");
};


export default useAllLabels; 
