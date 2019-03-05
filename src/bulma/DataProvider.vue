<script>
const { axios } = window;

export default {
    props: {
        errorHandler: {
            type: Function,
            default: (error) => {
                throw error;
            },
        },
        params: {
            type: Object,
            default: null,
        },
        path: {
            type: String,
            required: true,
        },
    },

    data: () => ({
        loading: false,
        response: null,
        errors: null,
    }),

    computed: {
        requestParams() {
            if (!this.params) {
                return null;
            }

            if (this.method === 'get') {
                return { params: this.params };
            }

            return this.params;
        },
    },

    created() {
        this.request();
    },

    methods: {
        request() {
            this.loading = true;

            axios.get(this.path, { params: this.params })
                .then(({ data }) => {
                    this.data = data.form;
                    this.loading = false;
                    this.$emit('loaded', data);
                }).catch((error) => {
                    this.error = error;
                    this.$emit('error', error);
                    this.loading = false;
                    this.errorHandler(error);
                });
        },
    },

    render() {
        return this.$scopedSlots.default({
            request: this.request,
            loading: this.loading,
            data: this.data,
            error: this.error,
        });
    },
};
</script>
