<template>
  <q-markup-table flat>
    <thead>
      <tr>
        <th class="text-left" style="width: 150px">
          <q-skeleton type="text" />
        </th>
        <th class="text-right">
          <q-skeleton type="text" />
        </th>
        <th class="text-right">
          <q-skeleton type="text" />
        </th>
        <th class="text-right">
          <q-skeleton type="text" />
        </th>
        <th class="text-right">
          <q-skeleton type="text" />
        </th>
        <th class="text-right">
          <q-skeleton type="text" />
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="n in 15" :key="n">
        <td class="text-left">
          <q-skeleton type="text" width="85px" />
        </td>
        <td class="text-right">
          <q-skeleton type="text" width="50px" />
        </td>
        <td class="text-right">
          <q-skeleton type="text" width="35px" />
        </td>
        <td class="text-right">
          <q-skeleton type="text" width="65px" />
        </td>
        <td class="text-right">
          <q-skeleton type="text" width="25px" />
        </td>
        <td class="text-right">
          <q-skeleton type="text" width="85px" />
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>
