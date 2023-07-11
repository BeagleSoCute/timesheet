interface handleRetriveLocationDataReturnType {
  latitude: number;
  longitude: number;
  isSuccessRetrivedLocation: boolean;
}

export const handleRetriveLocationData =
  async (): Promise<handleRetriveLocationDataReturnType> => {
    return new Promise<handleRetriveLocationDataReturnType>((resolve) => {
      let result = {
        isSuccessRetrivedLocation: false,
        latitude: 0,
        longitude: 0,
      };
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const res: any = position.coords;
          result = {
            isSuccessRetrivedLocation: true,
            latitude: res.latitude,
            longitude: res.longitude,
          };
          resolve(result); // Resolve the promise with the result
        },
        (error) => {
          console.log("error in handleRetriveLocationData", error);
          resolve(result); // Resolve the promise with the result
        }
      );
    });
  };