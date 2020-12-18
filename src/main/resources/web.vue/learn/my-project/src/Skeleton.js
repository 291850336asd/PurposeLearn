import Vue from 'vue'
import listSkeleton from './skeleton/listSkeleton'
import detailSkeleton from './skeleton/detailSkeleton'

export default new Vue({
    components: {
        listSkeleton,
        detailSkeleton
    },
    template: `
    <div>
      <listSkeleton id="listSkeleton" />
      <detailSkeleton id="detailSkeleton" />
    </div>
  `
})