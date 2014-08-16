<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-flex xs12 sm10>
        <v-toolbar color="indigo" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title>Labelling Invoice</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
          <v-btn class="indigo" outline @click="skip">skip</v-btn>
          <v-btn class="indigo" outline @click="save_close">Save & Close</v-btn>
          <v-btn class="indigo" outline @click="save_next">Save & Next</v-btn>
        </v-toolbar>
        <v-card>
          <v-layout row wrap>
            <v-flex xs12 sm7>
              <v-card-text>
                <iframe
                  width="100%"
                  height="800px"
                  src="https://s3-ap-southeast-1.amazonaws.com/test-invoice.konigle.com/Unlabelled-Invoice/afd863fb-cbf2-59c7-b7b2-c3724f9ca921__PURCHASES__28aa6a55-5ad5-5c56-b71a-8795005cb675.pdf"/>
              </v-card-text>
            </v-flex>
            <v-flex xs12 sm5>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      label="Invoice Number"
                      v-model="info.invoice_number"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      label="Invoice Date"
                      type="date"
                      v-model="info.invoice_date"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      label="Amount"
                      type="number"
                      v-model="info.amount"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      label="Currency"
                      v-model="info.currency"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      label="Description"
                      v-model="info.desc"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      label="Issued From"
                      v-model="info.issued_from"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      label="Issued To"
                      v-model="info.issued_to"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      label="Place of Supply"
                      v-model="info.place_of_supply"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <div>
                  <v-toolbar flat color="white">
                    <v-toolbar-title>Line Items(lines):</v-toolbar-title>
                    <v-divider
                      class="mx-2"
                      inset
                      vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                      <v-btn slot="activator" color="primary" fab small dark class="mb-2">
                        <v-icon>add</v-icon>
                      </v-btn>
                      <v-card>
                        <v-card-title>
                          <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                          <v-container grid-list-md>
                            <v-layout wrap>
                              <v-flex xs12 sm6 md4>
                                <v-text-field v-model="editedItem.description" label="Description">
                                </v-text-field>
                              </v-flex>
                              <v-flex xs12 sm6 md4>
                                <v-text-field v-model="editedItem.item_amount" label="Amount">
                                </v-text-field>
                              </v-flex>
                              <v-flex xs12 sm6 md4>
                                <v-text-field v-model="editedItem.item_category" label="Category">
                                </v-text-field>
                              </v-flex>
                              <v-flex xs12 sm6 md4>
                                <v-text-field v-model="editedItem.unit_price" label="Unit Price">
                                </v-text-field>
                              </v-flex>
                              <v-flex xs12 sm6 md4>
                                <v-text-field v-model="editedItem.quantity" label="Quantity">
                                </v-text-field>
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                  <v-data-table
                    :headers="headers"
                    :items="desserts"
                    hide-actions
                    class="elevation-1"
                  >
                    <template slot="items" slot-scope="props">
                      <td>{{ props.item.description }}</td>
                      <td class="text-xs-right">{{ props.item.item_amount }}</td>
                      <td class="text-xs-right">{{ props.item.item_category }}</td>
                      <td class="text-xs-right">{{ props.item.unit_price }}</td>
                      <td class="text-xs-right">{{ props.item.quantity }}</td>
                      <td class="justify-center layout px-0">
                        <v-icon
                          small
                          class="mr-2"
                          @click="editItem(props.item)"
                        >
                          edit
                        </v-icon>
                        <v-icon
                          small
                          @click="deleteItem(props.item)"
                        >
                          delete
                        </v-icon>
                      </td>
                    </template>
                    <template slot="no-data">
                      <v-btn color="blue" @click="initialize">Reset</v-btn>
                    </template>
                  </v-data-table>
                </div>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import { invoice } from '../api/upload';

export default {
  name: 'home',
  data: () => ({
    json_data: [],
    info: {
      invoice_number: '121AA',
      invoice_date: '2018-05-05',
      amount: 120.00,
      currency: 'SGD',
      desc: 'Receipt - Facebook Ads payment',
      issued_from: 'Facebook',
      issued_to: 'Ashish',
      place_of_supply: 'Singapore',
      lines: [
        {
          description: 'Facebook Ads',
          item_amount: 36.90,
          item_category: 'Ads',
          unit_price: 36.90,
          quantity: 1.00,
        },
        {
          description: 'Facebook Ads',
          item_amount: 33.10,
          item_category: 'Ads',
          unit_price: 33.10,
          quantity: 1.00,
        },
      ],
    },
    dialog: false,
    headers: [
      {
        text: 'Description',
        align: 'left',
        sortable: false,
        value: 'description',
      },
      { text: 'Amount', value: 'item_amount' },
      { text: 'Category', value: 'item_category' },
      { text: 'Price', value: 'unit_price' },
      { text: 'Quantity', value: 'quantity' },
      { text: 'Actions', value: 'name', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      description: '',
      item_amount: 0,
      item_category: 0,
      unit_price: 0,
      quantity: 0,
    },
    defaultItem: {
      description: '',
      item_amount: 0,
      item_category: 0,
      unit_price: 0,
      quantity: 0,
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
  },
  mounted() {
  },
  watch: {
    dialog(val) {
      return val || this.close();
    },
  },

  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.desserts = [
        {
          description: 'Frozen Yogurt',
          item_amount: 159,
          item_category: 6.0,
          unit_price: 24,
          quantity: 4.0,
        },
        {
          description: 'Ice cream sandwich',
          item_amount: 237,
          item_category: 9.0,
          unit_price: 37,
          quantity: 4.3,
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },

    save_next() {
      console.log('@@@save and next function @@');
      // invoice();
    },

    skip() {
      console.log('@@ skip function @@');
      this.info = [];
      this.desserts = [];
    },
    save_close() {
      this.info.lines = this.desserts;
      this.json_data.push(this.info);

      const data = JSON.stringify(this.json_data);
      const blob = new Blob([data], { type: 'text/plain' });
      const e = document.createEvent('MouseEvents');
      const a = document.createElement('a');
      a.download = 'invoice.json';
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    },
  },
};
</script>
<style>
  .v-dialog:not(.v-dialog--fullscreen) {
    max-height: none !important;
  }
</style>
