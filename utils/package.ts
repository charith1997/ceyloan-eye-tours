export function formatDuration(duration: string) {
  const numbers = duration?.match(/\d+/g);

  if (numbers && numbers.length >= 2) {
    const days = numbers[0];
    const nights = numbers[1];
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

export const getPlacesDiff = (oldPlaces = <any>[], newPlaces = <any>[]) => {
  const addedOrUpdated: any[] = [];
  const removedPlaceIds: string[] = [];

  // 1️⃣ Detect removed places (present before but missing now)
  oldPlaces.forEach((oldItem: any) => {
    const stillExists = newPlaces.some(
      (newItem: any) => newItem.place_id === oldItem.place_id
    );
    if (!stillExists) {
      removedPlaceIds.push(oldItem.place_id);
    }
  });

  // 2️⃣ Detect new or updated places
  newPlaces.forEach((newItem: any) => {
    const oldItem = oldPlaces.find(
      (old: any) => old.place_id === newItem.place_id
    );

    // New place (no ID or not in old list)
    if (!oldItem || !newItem.place_id) {
      addedOrUpdated.push(newItem);
    } else {
      // Check if something changed
      const isChanged = Object.keys(newItem).some(
        (key) =>
          key !== "place_id" &&
          JSON.stringify(newItem[key]) !== JSON.stringify(oldItem[key])
      );
      if (isChanged) {
        addedOrUpdated.push(newItem);
      }
    }
  });

  return { addedOrUpdated, removedPlaceIds };
};

export const isDifferent = (arr1: string[], arr2: string[]) => {
  if (arr1.length !== arr2.length) return true;
  return arr1.some((item, i) => item !== arr2[i]);
};
