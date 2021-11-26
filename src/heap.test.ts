import * as Heap from './heap'

it('insert: ascending sorted insertion', () => {
  const heap = Heap.make<number>((lhs, rhs) => lhs - rhs)
  Heap.insert(heap, 1, 2, 3, 4, 5)
  const ret = []
  while (!Heap.isEmpty(heap)) ret.push(Heap.remove(heap))
  expect(ret).toStrictEqual([1, 2, 3, 4, 5])
})

it('insert: descending sorted insertion', () => {
  const heap = Heap.make<number>((lhs, rhs) => lhs - rhs)
  Heap.insert(heap, 5, 4, 3, 2, 1)
  const ret = []
  while (!Heap.isEmpty(heap)) ret.push(Heap.remove(heap))
  expect(ret).toStrictEqual([1, 2, 3, 4, 5])
})

it('insert: diagram', () => {
  const heap = Heap.make<number>((lhs, rhs) => lhs - rhs)
  const vals = [
    21, 45, 43, 46, 51, 56, 50, 60, 70, 62, 52, 57, 58, 53, 54, 61, 63, 88
  ]
  Heap.insert(heap, ...vals)
  expect(heap.nodes).toStrictEqual(vals)
})

it('remove: diagram', () => {
  const vals = [
    21, 45, 43, 46, 51, 56, 50, 60, 70, 62, 52, 57, 58, 53, 54, 61, 63, 88
  ]
  const heap = Heap.make<number>((lhs, rhs) => lhs - rhs)
  Heap.insert(heap, ...vals)
  const ret = []
  while (!Heap.isEmpty(heap)) ret.push(Heap.remove(heap))
  expect(Heap.getSize(heap)).toStrictEqual(0)
  expect(ret).toStrictEqual([...vals].sort())
})

it('remove: underflow', () => {
  const heap = Heap.make<number>((lhs, rhs) => lhs - rhs)
  expect(() => Heap.remove(heap)).toThrow()
})
