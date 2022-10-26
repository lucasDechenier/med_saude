const SweetAlert = {
  methods: {
    alert(options) {
      this.$swal(options);
    },
    alertSuccess({title = "Success!"} = {}) {
      this.alert({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        title: title,
        type: 'success'
      });
    },
    alertWarning({title = "Warning!", timer = 3000} = {}) {
      this.alert({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: timer,
        title: title,
        type: 'warning'
      });
    },
    alertError({title = "Error!"} = {}) {
      this.alert({
        title: title,
        type: 'error',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
      });
    },
    confirm(options, callbackSuccess, callbackError) {
      options = Object.assign({
        title: "Atenção!",
        text: "Você tem certeza que deseja tomar essa ação?",
        showCancelButton: true,
        confirmButtonColor: "primary",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        reverseButtons: true
      }, options);

      this.$swal(options).then((result) => {
        if (result.value) {
          callbackSuccess()
        } else if (callbackError) {
          callbackError(result)
        }
      })
    }
  }
};
export default SweetAlert
