<script setup lang="ts">
import { PropType, computed } from 'vue'
import { TradeGood } from '../models/tradegood.model';
import { useMainStore } from "../stores/index"
import { useInventoryStore } from "../stores/inventory"

const props = defineProps({
  good:  {
    type: Object as PropType<TradeGood>,
    required: true
  },
  disabled: Boolean,
})

const emit = defineEmits<{
  (e: 'buy', id: string): void,
  (e: 'sell',  id: string): void,
}>()

const store = useMainStore()
const inventory = useInventoryStore()
const playerGood = computed(() => inventory.getPlayerGoodByName(props.good.goodType))

</script>


<template>
  <tr v-if="good.price || (!good.price && playerGood!.quantity > 0)">
    <td>
      {{good.goodType}}
    </td>
    <td v-if="good.price">
      ${{good.price!.toLocaleString(undefined, {minimumFractionDigits: 2})}}
    </td>
    <td v-else>
      --
    </td>
    <td>
      <span v-if="(playerGood && playerGood?.price > 0)">${{playerGood?.price?.toLocaleString(undefined, {minimumFractionDigits: 2})}}</span>
      <span v-else>––</span>
    </td>
    <td>
      <span v-if="(playerGood?.quantity && playerGood?.quantity > 0)">{{playerGood?.quantity.toLocaleString()}}</span>
      <span v-else>––</span>
    </td>
    <td>
      <div class="order-actions">
        <button v-if="good.price" :disabled="((good.price > store.cash) || inventory.inventorySpace <= 0)" @click="$emit('buy', good.id)">Buy</button>
        <button v-if="good.price" :disabled="(!playerGood?.quantity || playerGood?.quantity <= 0)" @click="$emit('sell', playerGood?.id)">Sell</button>
        <span v-if="!good.price" class="noDemand"><em>No demand</em></span>
      </div>
    </td>

  </tr>
</template>


<style scoped>
section {
  display: flex;
  align-items: baseline;
}

.order-actions {
  text-align: right;
}

button {
  margin: 0 2px;
}

td {
  height: 30px;
}

.noDemand {
  padding: 0 2rem;
}

@media screen and (max-width: 767px) {
  td {
    padding-bottom:10px;
  }
  .order-actions {
    display: flex;
    justify-content: flex-end;
    flex-flow: column;
  }

  button {
    padding: 0.3rem
  }
}

</style>
