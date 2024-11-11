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
  id: number;
  groupId: number;
  name: string;
  latitude: number;
  longitude: number;
};

export type PostLocationsGroupsIdResponseList= LocationData[];

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