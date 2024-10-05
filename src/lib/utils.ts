import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from 'axios';
import { Payment } from "@/app/Dashboard/columns";
import { data } from "@/constants/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const reverseGeocode = async (latitude:number, longitude:number) => {
  const API_KEY = 'b830641f36eb4d7c92c807928ba48761'; // Replace with your API key
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.results && data.results.length > 0) {
      const { city, country } = data.results[0].components;
      return { city, country };
    } else {
      return { city: null, country: null };
    }
  } catch (error) {
    console.error('Error with reverse geocoding: ', error);
    return { city: null, country: null };
  }
};

// // Example Usage:
// reverseGeocode(51.5074, -0.1278).then((location) => {
//   console.log(`City: ${location.city}, Country: ${location.country}`);
// });


// export async function getData(): Promise<Payment[]> {
//   const dataRaw = data;
//   const updatedData = await Promise.all(
//     dataRaw.map(async (item) => {
//       const [latitude, longitude] = item.location.split(",");
//       // const location = await reverseGeocode(Number(latitude), Number(longitude));
//       return {
//         ...item,
//         latitude: Number(latitude),
//         longitude: Number(longitude),
//         location: null
//         // `${location.city}, ${location.country}`,
//       };
//     })
//   );
//   return updatedData;
// }

export const fetcher = (url:string) => fetch(url).then((res) => {
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
});



