flats = Flat.create([
  { name: 'Flat 1', address: '123 Main St' },
  { name: 'Flat 2', address: '456 Elm St' },
  { name: 'Flat 3', address: '789 Oak St' }
])

flats.each do |flat|
  Room.create([
    { room_numer: '101', flat: flat },
    { room_numer: '202', flat: flat },
    { room_numer: '1110', flat: flat }
  ])
end
