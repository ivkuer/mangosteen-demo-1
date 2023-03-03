import {Ref, computed, onMounted, ref} from 'vue'
type Point = {
    x: number
    y: number
}

export const useSwipe = (element: Ref<HTMLElement | null>) => {
    const start = ref<Point| null>(null)
    const end = ref<Point| null>(null)
    const swiping = ref(false)
    const distance = computed(() => {
        if(!start.value || !end.value) return null
        return {
            x: end.value.x - start.value.x,
            y: end.value.y - start.value.y,
        }
    })
    const direction = computed(()=> {
        if (!distance.value) return ''
        const {x, y} = distance.value
        if(Math.abs(x) > Math.abs(y)) {
            return x > 0 ? 'right' : 'left'
        } else {
            return y > 0 ? 'down' : 'up'
        }
    }) 

    onMounted(() => {
        element.value?.addEventListener('touchstart', e => {
            swiping.value = true
            start.value = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            }
            end.value = null
        })
        element.value?.addEventListener('touchmove', e => {
            end.value = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            }
        })
        element.value?.addEventListener('touchend', e => {
            swiping.value = false
            start.value = null
            end.value = null
        })
    })

    return {distance, direction, swiping}
}