<script>
const { axios } = window;

export default {

    name: 'DataProvider',

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
        data: null,
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
        this.fetch();
    },

    methods: {
        fetch() {
            this.loading = true;

            axios.get(this.path, { params: this.params })
                .then(({ data }) => {
                    this.data = data.form;
                    this.loading = false;
                    this.$emit('loaded', data);
                }).catch((error) => {
                    this.$emit('error', error);
                    this.loading = false;
                    this.errorHandler(error);
                });
        },
    },

    render() {
        return this.$scopedSlots.default({
            data: this.data,
            loading: this.loading,
        });
    },
};
</script>
