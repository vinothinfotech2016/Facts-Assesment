import Table from "custom_react_table7";
// import { reactTableStyle } from "../../styles/reactTableStyle";
export function CustomReactTable(props) {
  const {
    columnData,
    rawData,
    style,
    columnSize,
    count,
    pageSize,
    currentPage,
    onPageNumberChange,
    onChangePageSize,
    disablePagination,
    disableColumnHiding,
    disableSort,
    disableRowSelection,
    selectedRows,
    // onSort,
    // isLoading,
  } = props;

  return (
    <>
      <div>
        <Table
          columnData={columnData}
          rawData={rawData}
          style={style}
          selectRows={selectedRows}
          columnSize={columnSize}
          disableColumnHiding={
            disableColumnHiding ? disableColumnHiding : false
          }
          disableRowSelection={
            disableRowSelection ? disableRowSelection : false
          }
          pagination={true}
          disablePagination={disablePagination}
          pageSizes={pageSize}
          currentPage={currentPage}
          onChangePageSize={onChangePageSize}
          onPageNumberChange={onPageNumberChange}
          pageCount={count}
          // onSort={onSort}
          disableColumnResize={true}
          disableSort={disableSort}
          manualSort={true}
        />
      </div>
    </>
  );
}
