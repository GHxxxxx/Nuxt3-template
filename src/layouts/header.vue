<template>
  <el-switch
    size="large"
    inline-prompt
    :active-icon="Moon"
    :inactive-icon="Sunny"
    :model-value="isDark"
    @click="toggleTheme"
  ></el-switch>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'
const isDark = useDark({
  storageKey: 'theme-appearance',
  valueDark: 'dark',
  valueLight: 'light'
})
// useToggle修改isDark状态
const toggleDark = useToggle(isDark)
// 点击toggleTheme
const toggleTheme = (event) => {
  let x = event.clientX //表示鼠标事件在窗口中的水平位置，即鼠标指针距离窗口左边界的距离。
  let y = event.clientY //表示鼠标事件在窗口中的垂直位置，即鼠标指针距离窗口上边界的距离。

  /**
   * 1. `Math.hypot()`方法计算了鼠标事件位置到窗口边界的最远距离。
   * 2. `Math.hypot()`方法会计算这两个距离的直角三角形的斜边长度，即最远距离。
   */
  let endRadius = Math.hypot(
    Math.max(x, innerWidth - x), //`Math.max(x, innerWidth - x)`会返回x的值和窗口宽度减去x的值中的较大值，即表示鼠标事件到窗口水平边界的最远距离
    Math.max(y, innerHeight - y) //同样，`Math.max(y, innerHeight - y)`表示鼠标事件到窗口垂直边界的最远距离
  )
  if (!document.startViewTransition) {
    toggleDark()
    return
  }
  // 使用了`document.startViewTransition()`方法来开始一个异步的视图过渡。
  let transition = document.startViewTransition(async () => {
    toggleDark() //切换暗黑模式的状态
  })
  // 这是一个异步函数调用，表示在页面过渡准备就绪后执行下面的代码。
  transition.ready.then(() => {
    // 定义了一个数组`clipPath`，其中包含两个元素，分别是裁剪路径的起始状态和结束状态。
    let clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
    // 这是一个动画效果的实现，通过改变`clipPath`属性的值来实现动画效果。`document.documentElement`表示整个HTML文档的根元素。
    document.documentElement.animate(
      {
        // 这里根据`isDark.value`的值来确定裁剪路径的动画效果。如果`isDark.value`为真，则将`clipPath`数组进行反转，实现从结束状态到起始状态的动画效果。
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath
      },
      {
        duration: 400, //动画的持续时间为400毫秒。
        easing: 'ease-in', //动画的缓动函数，表示动画开始时加速。

        // 这是一个伪元素选择器，根据`isDark.value`的值选择不同的伪元素。伪元素选择器可以用于在指定元素的前面或后面插入内容。
        pseudoElement: isDark.value ? '::view-transition-old(root)' : '::view-transition-new(root)'
      }
    )
  })
}
</script>

<style>
.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

[class='light'] {
  body {
    background-color: #fff;
  }
}

[class='dark'] {
  body {
    background-color: #000;
  }
}

::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
/* 进入dark模式和退出dark模式时，两个图像的位置顺序正好相反 */
::view-transition-old(root) {
  z-index: 1;
}

::view-transition-new(root) {
  z-index: 2147483646;
}
/* 根据自己选择器修改 */
[class='dark']::view-transition-old(root) {
  z-index: 2147483646;
}

[class='dark']::view-transition-new(root) {
  z-index: 1;
}
</style>
