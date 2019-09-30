const getDocId = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const docId = urlParams.get('sharedb_id') || ''

  return docId
}

export default getDocId
