<template>
    <div>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th :key="column" v-for="column in columns">{{column}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in rows" :key="row.id">
                    <td>{{row.id}}</td>
                    <td>{{row.location}}</td>
                    <td>{{row.name}}</td>
                    <td>{{row.dob}}</td>
                    <td>{{row.contact}}</td>
                    <td>
                        <span :class="{ 'badge-outline-success': row.status == 'Done' , 'badge-outline-danger' : row.status !== 'Done'  }" class="badge badge-pill  p-2">{{row.status}}
                        </span>
                        </td>
                
                    <td>
                        <button class=" btn btn-outline-primary text-black btn-rounded">View</button>
                        <button class="ml-2 btn btn-outline-danger text-black btn-rounded">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>    
    </div>
</template>

<script>
export default {
  name: "DynamicCustomTable",
  props: {
    columns: Array,
    rows: Array
  }
}
</script>