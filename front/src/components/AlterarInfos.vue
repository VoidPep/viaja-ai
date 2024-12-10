<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h2>Editar Informações</h2>
            </div>
            <div class="card-body">
                <form @submit.prevent="updateUser">
                    <div class="form-row">

                        <div class="form-group">
                            <label for="name">Nome</label>
                            <input id="name" type="text" v-model="form.name" />
                        </div>


                        <div class="form-group">
                            <label for="email">E-mail</label>
                            <input id="email" type="email" v-model="form.email"
                                :class="{ 'is-invalid': errors.email }" readonly/>
                            <span v-if="errors.email" class="error">{{ errors.email }}</span>
                        </div>
                    </div>


                    <div class="form-group">
                        <label for="oldPassword">Senha Antiga</label>
                        <input id="oldPassword" type="password" v-model="form.oldPassword"
                            :class="{ 'is-invalid': errors.oldPassword }" />
                        <span v-if="errors.oldPassword" class="error">{{ errors.oldPassword }}</span>
                    </div>


                    <div class="form-group">
                        <label for="newPassword">Nova Senha</label>
                        <input id="newPassword" type="password" v-model="form.newPassword"
                            :class="{ 'is-invalid': errors.newPassword }" />
                        <span v-if="errors.newPassword" class="error">{{ errors.newPassword }}</span>
                    </div>


                    <div class="form-group">
                        <label for="confirmPassword">Confirmar Nova Senha</label>
                        <input id="confirmPassword" type="password" v-model="form.confirmPassword"
                            :class="{ 'is-invalid': errors.confirmPassword }" />
                        <span v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</span>
                    </div>

                    <button type="submit" class="btn-save">Salvar</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";

export default {
    name: "EditUserCard",
    setup() {
        const form = ref({
            name: "",
            email: "",
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        });

        const errors = ref({});

        const validateForm = () => {
            errors.value = {};
            if (!form.value.email) {
                errors.value.email = "O e-mail é obrigatório.";
            } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
                errors.value.email = "E-mail inválido.";
            }
            if (!form.value.oldPassword) {
                errors.value.oldPassword = "A senha antiga é obrigatória.";
            }
            if (!form.value.newPassword) {
                errors.value.newPassword = "A nova senha é obrigatória.";
            }
            if (form.value.newPassword !== form.value.confirmPassword) {
                errors.value.confirmPassword = "As senhas não correspondem.";
            }
            return Object.keys(errors.value).length === 0;
        };

        const updateUser = () => {
            if (validateForm()) {
                console.log("Informações salvas:", form.value);
                alert("Informações atualizadas com sucesso!");
            }
        };

        return { form, errors, updateUser };
    },
};
</script>

<style scoped>
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f2f5;
    padding: 16px;
    box-sizing: border-box;
}

.card {
    max-width: 500px;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

.card-header {
    padding: 16px;
    border-bottom: 1px solid #ddd;
    background-color: #f8f9fa;
    text-align: center;
}

.card-body {
    padding: 24px;
}

.form-row {
    display: flex;
    gap: 24px;
    margin-bottom: 16px;
}

.form-group {
    flex: 1;
    margin-bottom: 16px;
}

input {
    width: 100%;
    padding: 8px;
    margin-top: 4px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
}

input[readonly] {
    background-color: #f8f9fa;
    cursor: not-allowed;
}

input.is-invalid {
    border-color: red;
}

.error {
    color: red;
    font-size: 12px;
}

.btn-save {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
}

.btn-save:hover {
    background-color: #0056b3;
}

.backgroundimage {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-image: url("@/assets/images/background-montanha-azul.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 16px;
    box-sizing: border-box;
}
</style>