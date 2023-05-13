const ObjectControlHeaders = () => (
  <thead className="sticky top-0 bg-gray-50">
    <tr>
      <th
        scope="col"
        className="sticky left-0 bg-gray-200 px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
      >
        Object
      </th>
      <th
        scope="col"
        className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
      >
        Value
      </th>
      <th
        scope="col"
        className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
      >
        Material
      </th>
      <th
        scope="col"
        className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
      >
        Scale
      </th>
      <th
        scope="col"
        className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
      >
        Position
      </th>
      <th
        scope="col"
        className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
      >
        Rotation
      </th>
    </tr>
  </thead>
);

export default ObjectControlHeaders;
