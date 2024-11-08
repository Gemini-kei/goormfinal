export type PostGroupRequestRequest = {
  groupName: string
}

export type PatchGroupsIdRequest = {
  groupName: string
}

export type PostLocationsGroupsIdRequest = {
  locationName: string
  latitude: number
  longitude: number
}

export type LocationData = {
  groupId: number;
  name: string;
  latitude: number;
  longitude: number;
};

export type PostLocationsGroupsIdResponse = {
  userId: number;
  locations: LocationData[]; // 여러 그룹 및 위치 데이터를 배열로 저장
}

export type GetLocationsRequest = {
  memberId:number
}

export type GetLocationsGroupsIdRequest = {
  memberId: number
}

export type PatchLocationsIdRequest = {
  locationName:string
  latitude:number
  longitude:number
}