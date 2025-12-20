export function formatDuration(duration: string) {
  const numbers = duration?.match(/\d+/g);

  if (numbers && numbers.length >= 2) {
    const days = numbers[0];
    const nights = numbers[1];
    return `${days} Days | ${nights} Nights`;
  }

  return "0 Days | 0 Nights";
}

export function formatDurationForDayCount(count: number) {
  if (count && count >= 1) {
    const days = count;
    const nights = count - 1;
    return `${days} Days | ${nights} Nights`;
  }

  return "0 Days | 0 Nights";
}

export function checkIfSortedOrder(data: any[]) {
  let filteredData = [];
  filteredData = data.filter(
    (item) =>
      (item.day_no === null || item.day_no === "") &&
      (item.sort_order === null || item.sort_order === "")
  );
  if (filteredData.length > 0) {
    return false;
  }
  return true;
}

export const getArrayDiff = (oldArray: any[], newArray: any[], key = "id") => {
  const oldIds = oldArray.map((item) =>
    typeof item === "object" ? item[key] : item
  );
  const newIds = newArray.map((item) =>
    typeof item === "object" ? item[key] : item
  );

  // Items removed from the original
  const removed = oldIds.filter((id) => !newIds.includes(id));

  // Items newly added
  const added = newIds.filter((id) => !oldIds.includes(id));

  return { added, removed };
};

export const isDifferent = (arr1: string[], arr2: string[]) => {
  if (arr1.length !== arr2.length) return true;
  return arr1.some((item, i) => item !== arr2[i]);
};

interface Place {
  place_id: string;
  description: string;
  order: number;
  day_no: number;
  events: string[];
  editedPackagePlaceID?: string;
}

interface PlaceChanges {
  newlyCreated: any[];
  updated: any[];
  removedPlaceIds: string[];
}

export function comparePlaces(oldPlaces: any, newPlaces: any): PlaceChanges {
  const newlyCreated: any[] = [];
  const updated: any[] = [];
  const removedPlaceIds: string[] = [];

  // Track which old places are still present in new places
  const newPlaceIds = new Set(
    newPlaces
      .filter((p: any) => p.editedPackagePlaceID)
      .map((p: any) => p.editedPackagePlaceID)
  );

  // Check for newly created and updated places
  newPlaces.forEach((newPlace: any) => {
    if (!newPlace.editedPackagePlaceID) {
      // No editedPackagePlaceID means it's newly created
      newlyCreated.push(newPlace);
    } else {
      // Find matching old place by editedPackagePlaceID
      const oldPlace = oldPlaces.find(
        (op: any) => op.editedPackagePlaceID === newPlace.editedPackagePlaceID
      );

      if (oldPlace) {
        // Compare if values are different
        if (!isPlaceEqual(oldPlace, newPlace)) {
          updated.push({ ...newPlace, id: newPlace.editedPackagePlaceID });
        }
      }
    }
  });

  // Check for removed places
  oldPlaces.forEach((oldPlace: any) => {
    if (
      oldPlace.editedPackagePlaceID &&
      !newPlaceIds.has(oldPlace.editedPackagePlaceID)
    ) {
      removedPlaceIds.push(oldPlace.editedPackagePlaceID);
    }
  });

  return { newlyCreated, updated, removedPlaceIds };
}

function isPlaceEqual(place1: Place, place2: Place): boolean {
  return (
    place1.place_id === place2.place_id &&
    place1.description === place2.description &&
    place1.order === place2.order &&
    place1.day_no === place2.day_no &&
    JSON.stringify(place1.events) === JSON.stringify(place2.events)
  );
}
