export interface PreferencesState {
  total: number,
  minimum: number,
  roles: {
    [role: number]: number
  }
}
