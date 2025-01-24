export function buildTree(flatData: any[], options: { id: string, parentId: string, children: string } = { id: 'id', parentId: 'parentId', children: 'children' }) {
  const { id, parentId, children } = options

  const idMap: Record<number, any> = {} // 用于存储节点的映射表
  const tree: any[] = [] // 存储最终的树形结构

  // 构建映射表
  flatData.forEach((item) => {
    idMap[item[id]] = { ...item } // 初始化节点并添加 children 数组
  })

  // 构建树形结构
  flatData.forEach((item) => {
    const node = idMap[item[id]]
    if (item[parentId] === null) {
      // 没有父节点，属于根节点
      tree.push(node)
    }
    else if (idMap[item[parentId]]) {
      if (!idMap[item[parentId]][children]) {
        idMap[item[parentId]][children] = []
      }
      // 有父节点，将当前节点添加到父节点的 children 数组中
      idMap[item[parentId]][children]!.push(node)
    }
  })

  return tree
}
