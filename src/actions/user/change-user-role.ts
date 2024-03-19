'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const changeUserRole = async (userId: string, role: string) => {
  const session = await auth();

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'Debe de estar autenticado como administrador',
    };
  }

  try {
    const newRole = role === 'admin' ? 'admin' : 'user';

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: newRole,
      },
    });

    // Revalidar página para que cargue los cambios.
    revalidatePath('/admin/users');

    return {
      ok: true,
      message: 'Si se pudo actualizar el role',
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: 'No se pudo actualizar el role, revisar logs',
    };
  }
};
