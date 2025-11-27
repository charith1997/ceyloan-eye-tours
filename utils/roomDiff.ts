// Utility function to compare room details and detect changes
export const compareRoomDetails = (initial: any[], current: any[]) => {
  if (initial.length !== current.length) return true;

  for (let i = 0; i < initial.length; i++) {
    const initialRoom = initial[i];
    const currentRoom = current.find((r: any) => r.id === initialRoom.id);

    if (!currentRoom) return true;

    if (
      initialRoom.room_type !== currentRoom.room_type ||
      initialRoom.size !== currentRoom.size ||
      String(initialRoom.beds) !== String(currentRoom.beds) ||
      String(initialRoom.members) !== String(currentRoom.members) ||
      JSON.stringify(initialRoom.description) !==
        JSON.stringify(currentRoom.description)
    ) {
      return true;
    }

    const initialImage = initialRoom.attachment?.value;
    const currentImage = currentRoom.attachment?.value;

    if (initialImage !== currentImage) {
      if (typeof initialImage === "string" && currentImage instanceof File) {
        return true;
      }
    }
  }

  return false;
};
